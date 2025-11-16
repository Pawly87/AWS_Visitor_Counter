import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function recordVisit() {
      try {
        const res = await fetch("YOUR API CALL", {
          method: "POST"
        });

        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to increment visitor count:", err);
      }
    }

    recordVisit();
  }, []);

  return (
    <div style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
      {count !== null ? (
        <>Visitor Count: <strong>{count}</strong></>
      ) : (
        <>Loading visitor count…</>
      )}
    </div>
  );
}
