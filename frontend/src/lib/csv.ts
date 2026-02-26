export type CsvColumn = { key: string; header: string }

export function escapeCell(value: string): string {
    // Prevent spreadsheet formula injection: prefix dangerous leading characters with a literal quote.
    // Numeric values are exempt — they cannot execute formulas and must not be corrupted (e.g. coordinates like -73.9).
    const isNumeric = value !== "" && Number.isFinite(Number(value))
    const isFormula = !isNumeric && /^[=+\-@]/.test(value.trimStart())
    const sanitized = isFormula ? `'${value}` : value
    if (sanitized.includes(",") || sanitized.includes('"') || sanitized.includes("\n") || sanitized.includes("\r")) {
        return `"${sanitized.replace(/"/g, '""')}"`
    }
    return sanitized
}

export function downloadCsv(csvContent: string, filename: string): void {
    const BOM = "\uFEFF" // UTF-8 BOM: required for Cyrillic text in Excel
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    setTimeout(() => URL.revokeObjectURL(url), 10000)
}
