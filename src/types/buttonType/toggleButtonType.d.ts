type toggleButton = {
  toggled: boolean,
  text: string,
  className?: string;
  theme: "dark" | "light",
  onToggle?: () => void
}

export default toggleButton;
