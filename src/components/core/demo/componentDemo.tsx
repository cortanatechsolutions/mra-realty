// src/components/ButtonSection.tsx
import React from "react";

const ComponentDemo: React.FC = () => {
  return (
    <div className="p-6 flex flex-wrap gap-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-1.5xl font-bold">Default Button</h3>
        <div className="p-6 flex flex-wrap gap-2">
          <button className="btn btn-light">Light</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-danger">Danger</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-dark">Dark</button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-1.5xl font-bold">Outline Button</h3>
        <div className="p-6 flex flex-wrap gap-2">
          <button className="btn btn-outline btn-light">Light</button>
          <button className="btn btn-outline btn-primary">Primary</button>
          <button className="btn btn-outline btn-success">Success</button>
          <button className="btn btn-outline btn-info">Info</button>
          <button className="btn btn-outline btn-danger">Danger</button>
          <button className="btn btn-outline btn-warning">Warning</button>
          <button className="btn btn-outline btn-dark">Dark</button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-1.5xl font-bold">Clear Button</h3>
        <div className="p-6 flex flex-wrap gap-2">
          <button className="btn btn-clear btn-light">Light</button>
          <button className="btn btn-clear btn-primary">Primary</button>
          <button className="btn btn-clear btn-success">Success</button>
          <button className="btn btn-clear btn-info">Info</button>
          <button className="btn btn-clear btn-danger">Danger</button>
          <button className="btn btn-clear btn-warning">Warning</button>
          <button className="btn btn-clear btn-dark">Dark</button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-1.5xl font-bold">With Icons - Default</h3>
        <div className="p-6 flex flex-wrap gap-2">
          <button className="btn btn-light">
            <i className="ki-outline ki-plus-squared"></i>
            Light
          </button>
          <button className="btn btn-secondary">
            <i className="ki-outline ki-plus-squared"></i>Secondary
          </button>
          <button className="btn btn-primary">
            <i className="ki-outline ki-plus-squared"></i>
            Primary
          </button>
          <button className="btn btn-success">
            <i className="ki-outline ki-plus-squared"></i>Success
          </button>
          <button className="btn btn-info">
            <i className="ki-outline ki-plus-squared"></i>Info
          </button>
          <button className="btn btn-danger">
            <i className="ki-outline ki-plus-squared"></i>Danger
          </button>
          <button className="btn btn-warning">
            <i className="ki-outline ki-plus-squared"></i>Warning
          </button>
          <button className="btn btn-dark">
            <i className="ki-outline ki-plus-squared"></i>Dark
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-1.5xl font-bold">Circle Button</h3>
        <div className="p-6 flex flex-wrap gap-2">
          <button className="btn btn-icon rounded-full btn-light">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-secondary">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-primary">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-success">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-info">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-danger">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-warning">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
          <button className="btn btn-icon rounded-full btn-dark">
            <i className="ki-outline ki-plus-squared"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDemo;
