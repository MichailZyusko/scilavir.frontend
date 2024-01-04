'use client';

import { FlowbiteSpinnerTheme, Spinner } from 'flowbite-react';

const theme: FlowbiteSpinnerTheme = {
  "base": "inline animate-spin text-black",
  "color": {
    "failure": "fill-red-600",
    "gray": "fill-gray-600",
    "info": "fill-cyan-600",
    "pink": "fill-pink-600",
    "purple": "fill-purple-600",
    "success": "fill-green-500",
    "warning": "fill-yellow-400",
    "yellow": "fill-yellow-300"
  },
  "light": {
    "off": {
      "base": "dark:text-gray-600",
      "color": {
        "failure": "",
        "gray": "dark:fill-gray-300",
        "info": "",
        "pink": "",
        "purple": "",
        "success": "",
        "warning": ""
      }
    },
    "on": {
      "base": "",
      "color": {
        "failure": "",
        "gray": "",
        "info": "",
        "pink": "",
        "purple": "",
        "success": "",
        "warning": ""
      }
    }
  },
  "size": {
    "xs": "w-3 h-3",
    "sm": "w-4 h-4",
    "md": "w-6 h-6",
    "lg": "w-8 h-8",
    "xl": "w-10 h-10",
    "2xl": "w-12 h-12",
  }
}

export function Loader() {
  return (
    <main className="flex flex-col flex-auto items-center justify-center">
      <div className="mb-40">
        <Spinner
          theme={theme}
          size="2xl"
          color="yellow"
        />
      </div>
    </main>
  );
}
