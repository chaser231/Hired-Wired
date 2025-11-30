"use client";

import { Button } from "@/components/atoms/Button";

export default function SandboxPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header className="mb-12">
        <h1 className="text-h1 mb-4">Design System Sandbox</h1>
        <p className="text-description text-gold">
          Component Testing Playground
        </p>
      </header>

      {/* Atoms Section */}
      <section className="mb-16">
        <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Atoms</h2>

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Button</h3>
          <div className="flex flex-wrap gap-4 items-center p-6 bg-white rounded-lg">
            <Button variant="cta-big">CTA Big</Button>
            <Button variant="cta-small">CTA Small</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="on-color">On Color</Button>
            <Button variant="node">Node Button</Button>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Typography</h3>
          <div className="p-6 bg-white rounded-lg space-y-4">
            <p className="text-h1">H1 - Instrument Serif 84px</p>
            <p className="text-h2">H2 - Instrument Serif 40px</p>
            <p className="text-description">Description - Pixform 30px Uppercase</p>
            <p className="text-h3">H3 - Akkurat 20px Semibold</p>
            <p className="text-h4">H4 - Akkurat 15px Semibold</p>
            <p className="text-pixel">Text Pixel - Pixform 10px Uppercase</p>
            <p className="text-grotesk">Text Grotesk - Akkurat 11px Regular</p>
            <p className="text-bold">Text Bold - Akkurat 11px Bold</p>
            <p className="text-caps">Caps - Akkurat 8px Uppercase</p>
          </div>
        </div>

        {/* Colors Preview */}
        <div className="mb-12">
          <h3 className="text-h3 mb-6">Colors</h3>
          <div className="p-6 bg-white rounded-lg">
            <div className="grid grid-cols-6 gap-4">
              {/* Base */}
              <ColorSwatch color="bg-black" name="Black" />
              <ColorSwatch color="bg-white border" name="White" />
              <ColorSwatch color="bg-gray-100" name="Gray 100" />
              <ColorSwatch color="bg-gray-200" name="Gray 200" />
              <ColorSwatch color="bg-gray-400" name="Gray 400" />
              <ColorSwatch color="bg-gray-500" name="Gray 500" />
              {/* Accent */}
              <ColorSwatch color="bg-yellow" name="Yellow" />
              <ColorSwatch color="bg-gold" name="Gold" />
              {/* Pastels */}
              <ColorSwatch color="bg-pink-soft" name="Pink Soft" />
              <ColorSwatch color="bg-pink" name="Pink" />
              <ColorSwatch color="bg-lavender" name="Lavender" />
              <ColorSwatch color="bg-mint" name="Mint" />
              <ColorSwatch color="bg-yellow-green" name="Yellow Green" />
              <ColorSwatch color="bg-peach" name="Peach" />
              <ColorSwatch color="bg-lemon" name="Lemon" />
              <ColorSwatch color="bg-error-bg" name="Error BG" />
              {/* Status */}
              <ColorSwatch color="bg-green" name="Green" />
              <ColorSwatch color="bg-red" name="Red" />
              <ColorSwatch color="bg-purple" name="Purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Molecules Section */}
      <section className="mb-16">
        <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Molecules</h2>
        <div className="p-6 bg-white rounded-lg">
          <p className="text-grotesk text-gray-500">Coming soon...</p>
        </div>
      </section>

      {/* Organisms Section */}
      <section className="mb-16">
        <h2 className="text-h2 mb-8 pb-4 border-b border-gray-200">Organisms</h2>
        <div className="p-6 bg-white rounded-lg">
          <p className="text-grotesk text-gray-500">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 rounded-lg ${color}`} />
      <span className="text-caps text-gray-500">{name}</span>
    </div>
  );
}

