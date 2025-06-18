"use client"
import { motion ,MotionProps} from "framer-motion";
import { HtmlHTMLAttributes } from "react";
type motionProps = MotionProps & HtmlHTMLAttributes<HTMLElement>

export const MotionH1 = ({children, ...rest}:motionProps) => {
    return <motion.h1 {...rest}>
        {children}
    </motion.h1>
}

export const MotionP = ({children, ...rest}:motionProps) => {
    return <motion.p {...rest}>
        {children}
    </motion.p>
}

export const MotionDiv = ({children, ...rest}:motionProps) => {
    return <motion.div {...rest}>
        {children}
    </motion.div>
}