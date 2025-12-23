import {
  type ControlElement,
  isControl,
  type JsonSchema,
  type Layout,
  type Rule,
  type UISchemaElement
} from "@jsonforms/core";
import set from "lodash.set";

import { useFormData } from "../../providers/FormDataProvider";
import type { AlobeesElementConfig } from "@/lib/alobees/types";

const addElementToLayout = (
  uiElement: Layout,
  elementToAdd: Layout,
  parentElement: Layout | ControlElement
): Layout => {
  if (!isControl(uiElement) && uiElement.elements.length) {
    return {
      ...uiElement,
      elements: (uiElement === parentElement
        ? [...uiElement.elements, elementToAdd]
        : uiElement.elements.map((el) =>
            addElementToLayout(el as Layout, elementToAdd, parentElement)
          )) as UISchemaElement[]
    };
  }

  return {
    ...uiElement,
    elements: uiElement === parentElement ? [elementToAdd] : []
  };
};

const removeElementFromLayout = (
  uiElement: Layout,
  elementToRemove: Layout
): Layout | undefined => {
  if (elementToRemove === uiElement) {
    return undefined;
  }

  if (uiElement.elements) {
    return {
      ...uiElement,
      elements: uiElement.elements
        .map((el) => removeElementFromLayout(el as Layout, elementToRemove))
        .filter(Boolean) as UISchemaElement[]
    };
  }

  return uiElement;
};

export const useAddUiElement = (parentElement: Layout | ControlElement) => {
  const { changeUiSchema, uischema } = useFormData();

  const handleElementAdd = (element: Layout | ControlElement) => {
    if (!uischema) {
      changeUiSchema(element);

      return;
    }

    const newCopy = addElementToLayout(
      uischema as Layout,
      element as Layout, // it's simpler to cast than to bother with the types
      parentElement
    );

    changeUiSchema(newCopy);
  };

  return handleElementAdd;
};

export const useAddElement = () => {
  const { changeSchema, schema } = useFormData();

  const handleElementAdd = (scope: string, element: JsonSchema) => {
    const path = scope.replace("#/", "").replaceAll("/", ".");

    const schemaCopy = { ...schema };

    set(schemaCopy, path, element);

    changeSchema(schemaCopy);
  };

  return handleElementAdd;
};

export const useDeleteUiElement = () => {
  const { changeUiSchema, uischema } = useFormData();

  const handleElementRemove = (elementToDelete: Layout | ControlElement) => {
    if (!uischema) {
      changeUiSchema(elementToDelete);

      return;
    }

    const newCopy = removeElementFromLayout(
      uischema as Layout,
      elementToDelete as Layout // it's simpler to cast than to bother with the types
    );

    changeUiSchema(newCopy);
  };

  return handleElementRemove;
};

const updateElementInLayout = (
  uiElement: Layout | ControlElement,
  targetElement: ControlElement,
  updater: (element: ControlElement) => ControlElement
): Layout | ControlElement => {
  if (isControl(uiElement)) {
    if (uiElement === targetElement) {
      return updater(uiElement);
    }
    return uiElement;
  }

  return {
    ...uiElement,
    elements: uiElement.elements.map((el) =>
      updateElementInLayout(el as Layout, targetElement, updater)
    ) as UISchemaElement[]
  };
};

export const useUpdateAlobeesConfig = (targetElement: ControlElement) => {
  const { changeUiSchema, uischema } = useFormData();

  const handleUpdateConfig = (config: AlobeesElementConfig | undefined) => {
    if (!uischema) {
      return;
    }

    const newCopy = updateElementInLayout(
      uischema as Layout,
      targetElement,
      (element) => ({
        ...element,
        options: {
          ...element.options,
          alobees: config
        }
      })
    );

    changeUiSchema(newCopy as Layout | ControlElement);
  };

  return handleUpdateConfig;
};

export const useUpdateRule = (targetElement: ControlElement) => {
  const { changeUiSchema, uischema } = useFormData();

  const handleUpdateRule = (rule: Rule | undefined) => {
    if (!uischema) {
      return;
    }

    const newCopy = updateElementInLayout(
      uischema as Layout,
      targetElement,
      (element) => {
        if (rule) {
          return { ...element, rule };
        }
        // Remove rule if undefined
        const { rule: _, ...rest } = element as ControlElement & { rule?: Rule };
        return rest as ControlElement;
      }
    );

    changeUiSchema(newCopy as Layout | ControlElement);
  };

  return handleUpdateRule;
};

const collectScopes = (uiElement: Layout | ControlElement): string[] => {
  if (isControl(uiElement)) {
    return [uiElement.scope];
  }

  if (uiElement.elements) {
    return uiElement.elements.flatMap((el) => collectScopes(el as Layout));
  }

  return [];
};

export const useAvailableScopes = (currentScope?: string): string[] => {
  const { uischema } = useFormData();

  if (!uischema) {
    return [];
  }

  const allScopes = collectScopes(uischema as Layout);
  return allScopes.filter((scope) => scope !== currentScope);
};
