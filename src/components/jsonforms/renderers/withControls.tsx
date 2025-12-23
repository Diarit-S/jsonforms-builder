import { type ComponentType } from "react";

import {
  type Categorization,
  type ControlElement,
  type ControlProps,
  type LayoutProps
} from "@jsonforms/core";
import { X } from "lucide-react";

import { AddElement } from "@/components/AddElement/AddElement";
import { AlobeesElement } from "@/components/AlobeesElement/AlobeesElement";
import {
  AddCategoryElement,
  AddLayoutElement
} from "@/components/AddLayoutElement/AddLayoutElement";
import {
  useDeleteUiElement,
  useUpdateAlobeesConfig
} from "@/components/jsonforms/hooks/useElements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import type { AlobeesElementConfig } from "@/lib/alobees/types";

interface ControlElementWithAlobees extends ControlElement {
  options?: {
    alobees?: AlobeesElementConfig;
  };
}

export const withElementControls = (
  WrappedComponent: ComponentType<ControlProps>
) => {
  return (props: ControlProps) => {
    const { visible, uischema } = props;
    const controlElement = uischema as ControlElementWithAlobees;

    const removeElement = useDeleteUiElement();
    const updateAlobeesConfig = useUpdateAlobeesConfig(controlElement);

    const currentAlobeesConfig = controlElement?.options?.alobees;

    if (!visible) {
      return null;
    }

    return (
      <div className=" rounded-md p-5 shadow-around mb-2">
        <div className="text-slate-400 text-sm flex justify-between w-full items-center">
          {WrappedComponent.displayName ?? "Element"}
          <Tooltip>
            <TooltipTrigger asChild>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() => removeElement(uischema)}
              />
            </TooltipTrigger>
            <TooltipContent>Remove Element</TooltipContent>
          </Tooltip>
        </div>
        <WrappedComponent {...props} />
        <AlobeesElement
          value={currentAlobeesConfig}
          onChange={updateAlobeesConfig}
        />
      </div>
    );
  };
};

export const withLayoutControls = (
  WrappedComponent: ComponentType<LayoutProps>
) => {
  return (props: LayoutProps) => {
    const { uischema, visible } = props;
    const removeElement = useDeleteUiElement();

    const addElementControls =
      WrappedComponent.displayName === "Categorization Layout" ? (
        <AddCategoryElement uiSchema={uischema as Categorization} />
      ) : (
        <div className="flex justify-between gap-4 mt-5 w-full">
          <AddLayoutElement uiSchema={uischema as ControlElement} />
          <AddElement uiSchema={uischema as ControlElement} />
        </div>
      );

    if (!visible) {
      return null;
    }

    return (
      <div className="rounded-md p-5 shadow-around mb-2">
        <div className="text-slate-400 text-sm flex justify-between w-full items-center">
          {WrappedComponent.displayName ?? "Element"}
          <Tooltip>
            <TooltipTrigger asChild>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() => removeElement(props?.uischema as ControlElement)}
              />
            </TooltipTrigger>
            <TooltipContent>Remove Element</TooltipContent>
          </Tooltip>
        </div>
        <WrappedComponent {...props} />
        {addElementControls}
      </div>
    );
  };
};
