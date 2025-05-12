"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ButtonLink } from "Components/ButtonLink";

export const CustomizeButton = ({ text = "Customize Your Own" }: Props) => {
  const params = useSearchParams();
  const searchParams = useMemo(() => {
    const copy = new URLSearchParams(params);
    copy.set("customizer", "1");
    const paramString = copy.toString();
    return paramString.length ? `?${paramString}` : "";
  }, [params]);
  return <ButtonLink text={text} href={searchParams} />;
};

interface Props {
  text?: string;
}
