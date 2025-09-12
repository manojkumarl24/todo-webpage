const FilterPanel = ({
  groups,
  statuses,
  selectedGroups,
  selectedStatuses,
  onGroupChange,
  onStatusChange,
}) => {
  return (
    <div className="filter-panel" style={{ marginBottom: "20px" }}>
      <h3>Filters</h3>

      <div>
        <label><b>Groups:</b></label>
        {groups.length === 0 ? (
          <p style={{ fontSize: "0.9em", color: "gray" }}>No groups yet</p>
        ) : (
          <select
            multiple
            value={selectedGroups}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
              onGroupChange(values);
            }}
          >
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Status Filter */}
      <div style={{ marginTop: "10px" }}>
        <label><b>Status:</b></label>
        <select
          multiple
          value={selectedStatuses}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
            onStatusChange(values);
          }}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
