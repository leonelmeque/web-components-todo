export function renderContainer<T>(element: string, Component: any) {
  const container = document.createElement(element, {
    is: Component,
  }) as T;

  document.body.appendChild(container as Node);

  return { container } as const;
}
