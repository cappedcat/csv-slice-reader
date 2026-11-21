// Independent slice-based reader for make.fun csv-reader 1.0.0 semantics.
// No shared state: each call parses its input in isolation.
export function run(input) {
  const s = String(input.text), n = s.length, header = input.header === true;
  const rows = [], errors = [];
  let columns = null, width = -1, p = s.charCodeAt(0) === 65279 ? 1 : 0, line = 1;
  let recordLine, recordRow;
  const error = code => errors.push({code, line: recordLine, row: recordRow});
  while (p < n) {
    let c = s.charCodeAt(p);
    if (c === 10) { ++p; ++line; continue; }
    if (c === 13 && s.charCodeAt(p+1) === 10) { p += 2; ++line; continue; }
    recordLine = line;
    recordRow = header && columns === null ? null : rows.length;
    const fields = [];
    let comma = true, quoted = false;
    while (comma) {
      comma = false;
      quoted = s.charCodeAt(p) === 34;
      let value = '', start = p, junk = false, added = 0, ended = false;
      if (quoted) {
        const open = p, openLine = line;
        start = ++p;
        let closed = false;
        while (p < n) {
          c = s.charCodeAt(p);
          if (c === 34) {
            value += s.slice(start, p);
            if (s.charCodeAt(p+1) === 34) {
              value += '"'; p += 2; start = p; continue;
            }
            ++p; closed = true; break;
          }
          if (c === 13) {
            value += s.slice(start, p) + '\n';
            p += s.charCodeAt(p+1) === 10 ? 2 : 1;
            start = p; ++line; continue;
          }
          if (c === 10) ++line;
          ++p;
        }
        if (!closed) {
          p = open+1; line = openLine;
          error('unterminated_quote');
          value = '"'; start = p;
        } else {
          start = p; junk = true;
        }
      }
      // Unquoted suffix, including a quoted field's optional trailing junk.
      while (p < n) {
        c = s.charCodeAt(p);
        if (c === 44 || c === 10 || c === 13) {
          value += s.slice(start, p); added += p-start;
          if (c === 44) { ++p; comma = true; ended = true; break; }
          if (c === 10) { ++p; ++line; ended = true; break; }
          if (s.charCodeAt(p+1) === 10) { p += 2; ++line; ended = true; break; }
          error('stray_cr'); ++p; start = p; continue;
        }
        ++p;
      }
      if (!ended) { value += s.slice(start, n); added += n-start; }
      if (junk && added > 0) error('quote_junk');
      fields.push(value);
    }
    if (fields.length === 1 && fields[0] === '' && !quoted) continue;
    if (width < 0) width = fields.length;
    if (header && columns === null) { columns = fields; continue; }
    if (fields.length < width) {
      errors.push({code:'short_row', line:recordLine, row:recordRow, fields:fields.length});
      while (fields.length < width) fields.push('');
    } else if (fields.length > width) {
      errors.push({code:'long_row', line:recordLine, row:recordRow, extra:fields.splice(width)});
    }
    rows.push(fields);
  }
  return {columns:header ? columns ?? [] : null, rows, errors};
}
