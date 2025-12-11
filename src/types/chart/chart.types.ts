import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export interface CustomTooltipProps<T>
  extends TooltipProps<ValueType, NameType> {
  label?: string;
  payload?: {
    value: number;
    name: string;
    color: string;
    payload: T;
  }[];
}

export interface DayWiseContributionProps {
  name: string;
  contributionCount: number;
}
