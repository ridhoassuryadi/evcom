declare module 'react-range-slider-input' {
    import { ComponentType } from 'react';
    
    interface RangeSliderProps {
      id?: string;
      min?: number;
      max?: number;
      step?: number;
      value?: [number, number];
      defaultValue?: [number, number];
      onInput?: (value: [number, number]) => void;
      onChange?: (value: [number, number]) => void;
      disabled?: boolean;
      className?: string;
    }
  
    const RangeSlider: ComponentType<RangeSliderProps>;
    export default RangeSlider;
  }