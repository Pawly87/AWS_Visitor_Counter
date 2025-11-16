import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function recordVisit() {
      try {
        const res = await fetch("https://3ec3k2uwph.execute-api.eu-west-2.amazonaws.com/Prod/visit", {
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
