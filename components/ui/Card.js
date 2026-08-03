export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-lg border-[0.5px] border-marca-grafito/20 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
