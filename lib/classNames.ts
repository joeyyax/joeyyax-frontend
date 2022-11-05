/**
 * Utility for commonly used class utils
 **/
import classNames from "classnames/dedupe"
import { twMerge } from "tailwind-merge"

const merge = (...args: any) => twMerge(classNames(...args))

export { classNames, merge }
