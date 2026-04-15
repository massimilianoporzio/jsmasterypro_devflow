/*
 *   Copyright (c) 2026 Massimiliano Porzio
 *   All rights reserved.
 */
"use client";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return <SonnerToaster theme={resolvedTheme as ToasterProps["theme"]} />;
}
