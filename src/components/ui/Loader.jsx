export default function Loader({ size = "w-10 h-10" }) {
  return (
    <div
      className={`${size} rounded-full border-4 animate-spin border-primary border-t-transparent`}
    />
  );
}