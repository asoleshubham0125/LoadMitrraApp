import { useEffect, useState, useRef } from "react";

export default function AddressAutocompleteInput({
  placeholder,
  value,
  onSelect,
}) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Track if change is from typing

  // Update internal query if prop changes (e.g. reset form)
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    // 1. If query is short or we aren't typing (we just selected), don't search
    if (query.length < 3 || !isTyping) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        // 2. Add 'countrycodes=in' to restrict to India (Optional, removes global noise)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&addressdetails=1&limit=5`,
          {
            signal: controller.signal,
            headers: {
              // OSM requires a User-Agent to identify the app
              "User-Agent": "LoadMitrra-App/1.0",
            },
          }
        );

        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Address fetch failed", err);
        }
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, isTyping]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true); // User is manually typing
  };

  const handleSelect = (place) => {
    setIsTyping(false); // Stop the useEffect from firing
    setQuery(place.display_name);
    setSuggestions([]);
    onSelect(place.display_name);
  };

  return (
    <div style={{ position: "relative" }} className="w-100">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        autoComplete="off"
        // Close menu when clicking away (delayed to allow click to register)
        onBlur={() => setTimeout(() => setSuggestions([]), 200)}
      />

      {suggestions.length > 0 && (
        <div
          className="shadow-sm border"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: "0 0 8px 8px",
            zIndex: 1050, // Higher z-index to sit on top of maps/modals
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((item) => (
            <div
              key={item.place_id}
              // use onMouseDown to prevent onBlur from firing before the click
              onMouseDown={() => handleSelect(item)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                fontSize: "14px",
                borderBottom: "1px solid #f0f0f0",
              }}
              className="suggestion-item"
              onMouseEnter={(e) => (e.target.style.background = "#f8f9fa")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "0.8rem",
            color: "#999",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}
