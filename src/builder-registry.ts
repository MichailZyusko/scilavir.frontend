"use client";
import { Builder } from "@builder.io/react";
import { AboutUs } from "./ui-kit/components/overview/about-us";
import { Footer } from "./ui-kit/nav/footer";

Builder.registerComponent(AboutUs, {
  name: "AboutUs",
});

Builder.registerComponent(Footer, {
  name: "Footer",
});
