import type { MDXComponents } from "mdx/types";
import { SystemLog } from "@/components/SystemLog";
import { BacktestChart } from "@/components/BacktestChart";
import { ArtemisChart } from "@/components/ArtemisChart";
import { CodeBlock } from "@/components/CodeBlock";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        SystemLog,
        BacktestChart,
        ArtemisChart,
        CodeBlock,
        MermaidDiagram,
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        Badge,
    };
}
