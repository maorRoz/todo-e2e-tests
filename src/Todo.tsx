import { useState } from "react";

type Item = {
  id: number;
  value: string;
};

export const Todo = () => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(items.concat({ id: count, value: value }));
      setCount(count + 1);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <input
          data-testid="item-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            width: "80%",
            outline: "none",
            border: "1px solid #598b94",
            marginRight: "4px",
          }}
        />
        <button
          data-testid="button-submit"
          onClick={handleSubmit}
          disabled={loading || !value}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#598b94",
            outline: "none",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: loading || !value ? "0.5" : 1,
          }}
        >
          {loading ? "loading..." : "submit"}
        </button>
      </div>
      <ul>
        {items.map((currentItem) => (
          <li
            data-testid={`item-${currentItem.id}`}
            key={currentItem.id}
            style={{ marginBottom: "15px", cursor: "pointer" }}
            onClick={() =>
              setItems(items.filter((item) => item.id !== currentItem.id))
            }
          >
            {currentItem.value}
          </li>
        ))}
      </ul>
    </>
  );
};
