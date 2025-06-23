import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PagerProps {
  initialOffset?: number;
  initialLimit?: number;
  total: number;
  onUpdate: (params: { offset: number; limit: number }) => void;
}

export const Pager = ({
  initialOffset = 0,
  initialLimit = 1,
  total,
  onUpdate,
}: PagerProps) => {
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const minimum = offset + 1;
  const maximum = Math.min(offset + limit, total);
  const value = limit > 1 ? `${minimum}-${maximum}` : `${minimum}`;

  useEffect(() => {
    // Manejamos click fuera solo cuando estamos en modo de edición
    const handleClickAway = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        applyInput(); // Aplicamos el valor al hacer click fuera
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickAway, {
        capture: true,
      });
    }

    return () => document.removeEventListener("mousedown", handleClickAway); // Cleanup
  }, [isEditing]);

  const clamp = (num: number, min: number, max: number) => {
    return Math.max(Math.min(num, max), min);
  };

  const parse = (input: string) => {
    const [minStr, maxStr] = input.trim().split(/[-,;\s]+/);
    let min = parseInt(minStr, 10);
    let max = maxStr ? parseInt(maxStr, 10) : min;
    min = clamp(min, 1, total);
    max = clamp(max, 1, total);
    return { minimum: min - 1, maximum: max };
  };

  const update = (newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
    onUpdate({ offset: newOffset, limit: newLimit });
    setIsEditing(false); // Desactivamos edición
  };

  const navigate = (direction: -1 | 1) => {
    let newOffset = offset + limit * direction;
    if (newOffset >= total) {
      newOffset = 0;
    } else if (newOffset < 0 && limit === 1) {
      newOffset = total - 1;
    } else if (newOffset < 0 && limit > 1) {
      newOffset = total - (total % limit || limit);
    }
    update(newOffset, limit);
  };

  const applyInput = () => {
    const { minimum, maximum } = parse(inputValue);
    if (!isNaN(minimum) && !isNaN(maximum) && minimum < maximum) {
      update(minimum, maximum - minimum);
    } else {
      setIsEditing(false); // Cancelamos la edición si el valor es inválido
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyInput(); // Aplica el cambio al presionar "Enter"
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false); // Cancela la edición con "Escape"
    }
  };

  const handleValueClick = () => {
    if (!isEditing) {
      setInputValue(value); // Cargamos el valor actual
      setIsEditing(true); // Activamos la edición
      setTimeout(() => inputRef.current?.focus(), 0); // Enfocamos el input
    }
  };

  return (
    <nav className="flex gap-2 h-full items-center my-2" aria-label="Pager">
      <span className="flex items-center gap-1">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="text-sm h-5 p-0 m-0 text-end outline-none input-sm"
            value={inputValue}
            onBlur={applyInput} // Aplica el valor al hacer "blur"
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
        ) : (
          <span
            className="text-sm border-transparent cursor-pointer"
            onClick={handleValueClick}
          >
            {value}
          </span>
        )}
        <span className="text-sm">/</span>
        <span className="text-sm">{total}</span>
      </span>
      <span className="btn-group flex gap-2">
        <button
          type="button"
          className="btn btn-sm"
          aria-label="Previous"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className="btn btn-sm"
          aria-label="Next"
          onClick={() => navigate(1)}
        >
          <ChevronRight />
        </button>
      </span>
    </nav>
  );
};
