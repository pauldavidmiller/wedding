import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  CROSSWORD_ENTRIES,
  CROSSWORD_GRID,
  CROSSWORD_HEIGHT,
  CROSSWORD_HIDDEN_CELLS,
  CROSSWORD_HIDDEN_MESSAGE,
  CROSSWORD_WIDTH,
  CrosswordEntry,
} from "../data/crossword";

type Direction = "across" | "down";

const BLANK = ".";

const cellKey = (row: number, col: number) => `${row},${col}`;

const isBlank = (row: number, col: number) =>
  row < 0 ||
  col < 0 ||
  row >= CROSSWORD_HEIGHT ||
  col >= CROSSWORD_WIDTH ||
  CROSSWORD_GRID[row][col] === BLANK;

const AnniversaryCrossword = () => {
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  /* Start on 1 Across so there is always a clue on screen. */
  const firstEntry = CROSSWORD_ENTRIES[0];
  const [active, setActive] = useState({
    row: firstEntry.row,
    col: firstEntry.col,
    dir: firstEntry.dir as Direction,
  });
  const [checked, setChecked] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  /* The number shown in the corner of a square, and which entries own it. */
  const { numbers, entriesAtCell } = useMemo(() => {
    const nums: Record<string, number> = {};
    const owners: Record<string, CrosswordEntry[]> = {};
    CROSSWORD_ENTRIES.forEach((entry) => {
      nums[cellKey(entry.row, entry.col)] = entry.number;
      for (let i = 0; i < entry.answer.length; i++) {
        const row = entry.dir === "down" ? entry.row + i : entry.row;
        const col = entry.dir === "across" ? entry.col + i : entry.col;
        const key = cellKey(row, col);
        owners[key] = (owners[key] ?? []).concat(entry);
      }
    });
    return { numbers: nums, entriesAtCell: owners };
  }, []);

  const hiddenIndexes = useMemo(() => {
    const map: Record<string, number> = {};
    CROSSWORD_HIDDEN_CELLS.forEach((cell, index) => {
      map[cellKey(cell.row, cell.col)] = index;
    });
    return map;
  }, []);

  const activeEntry = useMemo(() => {
    const owners = entriesAtCell[cellKey(active.row, active.col)] ?? [];
    return owners.find((entry) => entry.dir === active.dir) ?? owners[0];
  }, [active, entriesAtCell]);

  const solved = useMemo(
    () =>
      CROSSWORD_ENTRIES.every((entry) =>
        entry.answer.split("").every((letter, i) => {
          const row = entry.dir === "down" ? entry.row + i : entry.row;
          const col = entry.dir === "across" ? entry.col + i : entry.col;
          return guesses[cellKey(row, col)] === letter;
        })
      ),
    [guesses]
  );

  const focusCell = useCallback((row: number, col: number) => {
    inputRefs.current[cellKey(row, col)]?.focus();
    inputRefs.current[cellKey(row, col)]?.select();
  }, []);

  const selectCell = useCallback(
    (row: number, col: number) => {
      const owners = entriesAtCell[cellKey(row, col)] ?? [];
      const sameCell = active.row === row && active.col === col;
      const other: Direction = active.dir === "across" ? "down" : "across";
      // Clicking the square you are already on flips direction, when it can.
      const dir =
        sameCell && owners.some((entry) => entry.dir === other)
          ? other
          : owners.some((entry) => entry.dir === active.dir)
          ? active.dir
          : owners[0]?.dir ?? "across";
      setActive({ row, col, dir });
      focusCell(row, col);
    },
    [active, entriesAtCell, focusCell]
  );

  const step = useCallback(
    (row: number, col: number, dir: Direction, delta: number) => {
      const nextRow = dir === "down" ? row + delta : row;
      const nextCol = dir === "across" ? col + delta : col;
      if (isBlank(nextRow, nextCol)) return null;
      return { row: nextRow, col: nextCol };
    },
    []
  );

  const advance = useCallback(
    (row: number, col: number, dir: Direction, delta: number) => {
      const next = step(row, col, dir, delta);
      if (!next) return;
      setActive({ ...next, dir });
      focusCell(next.row, next.col);
    },
    [focusCell, step]
  );

  const setLetter = useCallback((row: number, col: number, letter: string) => {
    setChecked(false);
    setGuesses((prev) => {
      const next = { ...prev };
      if (letter) next[cellKey(row, col)] = letter;
      else delete next[cellKey(row, col)];
      return next;
    });
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    // Phone keyboards can hand us the whole field, so take the last new letter.
    const letters = value.toUpperCase().replace(/[^A-Z]/g, "");
    if (!letters) return;
    setLetter(row, col, letters[letters.length - 1]);
    advance(row, col, active.dir, 1);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const arrows: Record<string, [Direction, number]> = {
      ArrowRight: ["across", 1],
      ArrowLeft: ["across", -1],
      ArrowDown: ["down", 1],
      ArrowUp: ["down", -1],
    };

    if (arrows[event.key]) {
      event.preventDefault();
      const [dir, delta] = arrows[event.key];
      const next = step(row, col, dir, delta);
      if (next) {
        setActive({ ...next, dir });
        focusCell(next.row, next.col);
      } else {
        setActive({ row, col, dir });
      }
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      if (guesses[cellKey(row, col)]) setLetter(row, col, "");
      else {
        const prev = step(row, col, active.dir, -1);
        if (prev) {
          setLetter(prev.row, prev.col, "");
          setActive({ ...prev, dir: active.dir });
          focusCell(prev.row, prev.col);
        }
      }
      return;
    }

    if (event.key === " " || event.key === "Tab") {
      event.preventDefault();
      selectCell(row, col);
    }
  };

  const jumpToEntry = (entry: CrosswordEntry) => {
    setActive({ row: entry.row, col: entry.col, dir: entry.dir });
    focusCell(entry.row, entry.col);
  };

  const revealAll = () => {
    const next: Record<string, string> = {};
    for (let row = 0; row < CROSSWORD_HEIGHT; row++) {
      for (let col = 0; col < CROSSWORD_WIDTH; col++) {
        if (!isBlank(row, col)) next[cellKey(row, col)] = CROSSWORD_GRID[row][col];
      }
    }
    setChecked(false);
    setGuesses(next);
  };

  const revealWord = () => {
    if (!activeEntry) return;
    setChecked(false);
    setGuesses((prev) => {
      const next = { ...prev };
      activeEntry.answer.split("").forEach((letter, i) => {
        const row = activeEntry.dir === "down" ? activeEntry.row + i : activeEntry.row;
        const col = activeEntry.dir === "across" ? activeEntry.col + i : activeEntry.col;
        next[cellKey(row, col)] = letter;
      });
      return next;
    });
  };

  const clearAll = () => {
    setChecked(false);
    setGuesses({});
  };

  const activeCells = useMemo(() => {
    const set = new Set<string>();
    if (activeEntry) {
      for (let i = 0; i < activeEntry.answer.length; i++) {
        const row = activeEntry.dir === "down" ? activeEntry.row + i : activeEntry.row;
        const col = activeEntry.dir === "across" ? activeEntry.col + i : activeEntry.col;
        set.add(cellKey(row, col));
      }
    }
    return set;
  }, [activeEntry]);

  const renderClueList = (dir: Direction) => (
    <div className="crossword-clue-list">
      <h4 className="crossword-clue-heading">{dir === "across" ? "Across" : "Down"}</h4>
      <ol>
        {CROSSWORD_ENTRIES.filter((entry) => entry.dir === dir).map((entry) => (
          <li key={`${entry.number}-${entry.dir}`}>
            <button
              type="button"
              className={`crossword-clue${
                activeEntry?.number === entry.number && activeEntry?.dir === entry.dir
                  ? " crossword-clue-active"
                  : ""
              }`}
              onClick={() => jumpToEntry(entry)}
            >
              <span className="crossword-clue-number">{entry.number}</span>
              <span className="crossword-clue-text">{entry.clue}</span>
              <span className="crossword-clue-length">{entry.answer.length}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section className="crossword">
      <h2 className="crossword-title">The One Year Crossword</h2>
      <p className="crossword-intro">
        Forty-eight little pieces of our first year. Tap a square, type an answer, and
        keep an eye on the gold circles &mdash; read top to bottom, they spell
        something out.
      </p>

      {activeEntry && (
        <div className="crossword-current-clue">
          <span className="crossword-current-number">
            {activeEntry.number} {activeEntry.dir === "across" ? "Across" : "Down"}
          </span>
          <span>{activeEntry.clue}</span>
        </div>
      )}

      <div className="crossword-grid-scroll">
        <div
          className="crossword-grid"
          style={{ gridTemplateColumns: `repeat(${CROSSWORD_WIDTH}, var(--crossword-cell))` }}
        >
          {CROSSWORD_GRID.map((line, row) =>
            line.split("").map((letter, col) => {
              const key = cellKey(row, col);
              if (letter === BLANK) return <div key={key} className="crossword-cell-blank" />;

              const guess = guesses[key] ?? "";
              const wrong = checked && guess !== "" && guess !== letter;
              const hidden = hiddenIndexes[key] !== undefined;
              const isActiveCell = active.row === row && active.col === col;

              const classes = [
                "crossword-cell",
                activeCells.has(key) ? "crossword-cell-in-word" : "",
                isActiveCell ? "crossword-cell-active" : "",
                hidden ? "crossword-cell-hidden" : "",
                wrong ? "crossword-cell-wrong" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div key={key} className={classes}>
                  {numbers[key] && <span className="crossword-cell-number">{numbers[key]}</span>}
                  <input
                    ref={(element) => {
                      inputRefs.current[key] = element;
                    }}
                    className="crossword-cell-input"
                    type="text"
                    inputMode="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label={`Row ${row + 1}, column ${col + 1}`}
                    value={guess}
                    onChange={(event) => handleChange(row, col, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, row, col)}
                    onFocus={() => {
                      if (!isActiveCell) selectCell(row, col);
                    }}
                    onClick={() => selectCell(row, col)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="crossword-controls">
        <button type="button" onClick={() => setChecked(true)}>
          Check
        </button>
        <button type="button" onClick={revealWord}>
          Reveal word
        </button>
        <button type="button" onClick={revealAll}>
          Reveal all
        </button>
        <button type="button" onClick={clearAll}>
          Clear
        </button>
      </div>

      {solved && (
        <p className="crossword-solved">
          Every square. Of course you did. {CROSSWORD_HIDDEN_MESSAGE}.
        </p>
      )}

      <div className="crossword-clues">
        {renderClueList("across")}
        {renderClueList("down")}
      </div>
    </section>
  );
};

export default AnniversaryCrossword;
