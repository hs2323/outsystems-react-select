import Select from "react-select";
import type { MultiValue, SingleValue } from "react-select";

type OptionType = { label: string; value: string };

interface ReactSelectProps {
  ariaErrormessage?: string;
  ariaInvalid?: "false" | "grammar" | "spelling" | "true" | boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaLive?: "assertive" | "off" | "polite";
  autoFocus?: boolean;
  backspaceRemovesValue?: boolean;
  blurInputOnSelect?: boolean;
  captureMenuScroll?: boolean;
  className?: string;
  classNamePrefix?: string;
  closeMenuOnScroll?: boolean;
  closeMenuOnSelect?: boolean;
  controlShouldRenderValue?: boolean;
  defaultInputValue?: string;
  defaultMenuIsOpen?: boolean;
  defaultValue?: OptionType | OptionType[];
  delimiter?: string;
  escapeClearsValue?: boolean;
  form?: string;
  hideSelectedOptions?: boolean;
  id?: string;
  inputId?: string;
  instanceId?: number | string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  isRtl?: boolean;
  isSearchable?: boolean;
  maxMenuHeight?: number;
  menuPlacement?: "auto" | "bottom" | "top";
  menuPosition?: "absolute" | "fixed";
  menuShouldBlockScroll?: boolean;
  menuShouldScrollIntoView?: boolean;
  minMenuHeight?: number;
  name?: string;
  onSelectChange?: string;
  openMenuOnClick?: boolean;
  openMenuOnFocus?: boolean;
  options: OptionType[];
  pageSize?: number;
  required?: boolean;
  tabIndex?: number;
  tabSelectsValue?: boolean;
  unstyled?: boolean;
  value?: OptionType | OptionType[];
}

const ReactSelect: React.FC<ReactSelectProps> = ({
  ariaErrormessage,
  ariaInvalid,
  ariaLabel,
  ariaLabelledby,
  ariaLive,
  autoFocus,
  backspaceRemovesValue,
  blurInputOnSelect,
  captureMenuScroll,
  className,
  classNamePrefix,
  closeMenuOnScroll,
  closeMenuOnSelect,
  controlShouldRenderValue,
  defaultInputValue,
  defaultMenuIsOpen,
  defaultValue,
  delimiter,
  escapeClearsValue,
  form,
  hideSelectedOptions,
  id,
  inputId,
  instanceId,
  isClearable,
  isDisabled,
  isLoading,
  isMulti,
  isRtl,
  isSearchable,
  maxMenuHeight,
  menuPlacement,
  menuPosition,
  menuShouldBlockScroll,
  menuShouldScrollIntoView,
  minMenuHeight,
  name,
  onSelectChange,
  openMenuOnClick,
  openMenuOnFocus,
  options,
  pageSize,
  required,
  tabIndex,
  tabSelectsValue,
  unstyled,
  value,
}) => {
  const handleChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
  ) => {
    const newValues = Array.isArray(newValue) ? newValue : [newValue];
    // @ts-expect-error TS2538 Ignore missing onSelectChange
    document[onSelectChange](JSON.stringify(newValues));
  };
  return (
    <Select
      aria-errormessage={ariaErrormessage}
      aria-invalid={ariaInvalid}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-live={ariaLive}
      autoFocus={autoFocus}
      backspaceRemovesValue={backspaceRemovesValue}
      blurInputOnSelect={blurInputOnSelect}
      captureMenuScroll={captureMenuScroll}
      className={className}
      classNamePrefix={classNamePrefix}
      closeMenuOnScroll={closeMenuOnScroll}
      closeMenuOnSelect={closeMenuOnSelect}
      controlShouldRenderValue={controlShouldRenderValue}
      defaultInputValue={defaultInputValue}
      defaultMenuIsOpen={defaultMenuIsOpen}
      defaultValue={defaultValue}
      delimiter={delimiter}
      escapeClearsValue={escapeClearsValue}
      form={form}
      hideSelectedOptions={hideSelectedOptions}
      id={id}
      inputId={inputId}
      instanceId={instanceId}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isMulti={isMulti}
      isRtl={isRtl}
      isSearchable={isSearchable}
      maxMenuHeight={maxMenuHeight}
      menuPlacement={menuPlacement}
      menuPosition={menuPosition}
      menuShouldBlockScroll={menuShouldBlockScroll}
      menuShouldScrollIntoView={menuShouldScrollIntoView}
      minMenuHeight={minMenuHeight}
      name={name}
      onChange={handleChange}
      openMenuOnClick={openMenuOnClick}
      openMenuOnFocus={openMenuOnFocus}
      options={options}
      pageSize={pageSize}
      required={required}
      tabIndex={tabIndex}
      tabSelectsValue={tabSelectsValue}
      unstyled={unstyled}
      value={value}
    />
  );
};

export default ReactSelect;
