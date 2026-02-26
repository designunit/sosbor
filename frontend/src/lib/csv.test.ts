import { describe, expect, it } from "vitest"
import { escapeCell, featuresToCsv } from "./csv"

describe("escapeCell", () => {
    it("plain string passes through unchanged", () => {
        expect(escapeCell("hello")).toBe("hello")
    })

    it("empty string passes through unchanged", () => {
        expect(escapeCell("")).toBe("")
    })

    it("comma in value wraps in double quotes", () => {
        expect(escapeCell("a,b")).toBe('"a,b"')
    })

    it("double quote in value wraps and doubles quotes", () => {
        expect(escapeCell('say "hi"')).toBe('"say ""hi"""')
    })

    it("newline in value wraps in double quotes", () => {
        expect(escapeCell("a\nb")).toBe('"a\nb"')
    })

    it("carriage return in value wraps in double quotes", () => {
        expect(escapeCell("a\rb")).toBe('"a\rb"')
    })

    it("= at start is prefixed to prevent formula injection", () => {
        expect(escapeCell("=CMD()")).toBe("'=CMD()")
    })

    it("@ at start is prefixed to prevent formula injection", () => {
        expect(escapeCell("@SUM")).toBe("'@SUM")
    })

    it("- at start with non-numeric value is prefixed", () => {
        expect(escapeCell("-abc")).toBe("'-abc")
    })

    it("negative number is not prefixed (numeric values are exempt)", () => {
        expect(escapeCell("-73.9857")).toBe("-73.9857")
    })

    it("+1 coerces to number and is not prefixed", () => {
        expect(escapeCell("+1")).toBe("+1")
    })

    it("zero passes through unchanged", () => {
        expect(escapeCell("0")).toBe("0")
    })

    it("leading whitespace before = triggers formula prefix", () => {
        expect(escapeCell(" =CMD()")).toBe("' =CMD()")
    })

    it("formula with comma is prefixed then wrapped", () => {
        expect(escapeCell("=a,b")).toBe('"\'=a,b"')
    })
})

describe("featuresToCsv", () => {
    it("produces correct header row", () => {
        const csv = featuresToCsv([])
        const header = csv.split("\n")[0]
        expect(header).toBe("id,content,lng,lat,created")
    })

    it("null lng and lat become empty strings", () => {
        const csv = featuresToCsv([{ id: "abc", content: "test", lng: null, lat: null, created: "2024-01-01" }])
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("abc,test,,,2024-01-01")
    })

    it("numeric coordinates are written as-is", () => {
        const csv = featuresToCsv([
            { id: "abc", content: "test", lng: 29.076903, lat: 59.896869, created: "2024-01-01" },
        ])
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("abc,test,29.076903,59.896869,2024-01-01")
    })
})
