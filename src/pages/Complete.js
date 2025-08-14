"use client";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load Google Maps Places API script
    const scriptId = "google-maps-places-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDss7uGbr7zwa_z76T5Ald2yXuB-wQusfs&libraries=places";
      script.async = true;
      script.onload = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          const options = {
            componentRestrictions: { country: "in" }
          };
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
              setInputValue(place.formatted_address);
              setPlace(place);
            } else if (place.name) {
              setInputValue(place.name);
              setPlace(place);
            }
          });
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter text here"
        className={{}}
        style={{ height: "40px", width: "100%" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label
        style={{ height: "1000px", width: "100%" }}
      >
        {JSON.stringify(place, null, 2)}
      </label>
    </div>
  );
}