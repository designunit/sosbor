import { describe, expect, it } from "vitest"
import type { FeatureRow, SurveyRecord, SurveySchemaItem } from "@/types"
import { featuresToCsv, getFeaturesColumns, getSurveysColumns, surveysToCsv } from "./exportData"

describe("getFeaturesColumns", () => {
    it("returns five expected columns", () => {
        const columns = getFeaturesColumns()
        expect(columns).toHaveLength(5)
        expect(columns.map((c) => c.key)).toEqual(["id", "content", "lng", "lat", "created"])
    })
})

describe("featuresToCsv", () => {
    it("produces correct header row", () => {
        const csv = featuresToCsv([])
        const header = csv.split("\n")[0]
        expect(header).toBe("id,content,lng,lat,created")
    })

    it("null lng and lat become empty strings", () => {
        const feature: FeatureRow = { id: "abc", content: "test", lng: null, lat: null, created: "2024-01-01" }
        const csv = featuresToCsv([feature])
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("abc,test,,,2024-01-01")
    })

    it("numeric coordinates are written as-is", () => {
        const feature: FeatureRow = {
            id: "abc",
            content: "test",
            lng: 29.076903,
            lat: 59.896869,
            created: "2024-01-01",
        }
        const csv = featuresToCsv([feature])
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("abc,test,29.076903,59.896869,2024-01-01")
    })
})

describe("getSurveysColumns", () => {
    it("starts with id and created columns", () => {
        const columns = getSurveysColumns([])
        expect(columns).toHaveLength(2)
        expect(columns[0]).toEqual({ key: "id", header: "id" })
        expect(columns[1]).toEqual({ key: "created", header: "created" })
    })

    it("plain question item adds single column with key = item.id", () => {
        const schema: SurveySchemaItem[] = [{ id: "q1", type: "text", text: "Your name" }]
        const columns = getSurveysColumns(schema)
        expect(columns).toHaveLength(3)
        expect(columns[2]).toEqual({ key: "q1", header: "Your name" })
    })

    it("selectList item with list expands to one column per entry", () => {
        const schema: SurveySchemaItem[] = [
            { id: "q2", type: "selectList", text: "Choose", list: ["Option A", "Option B"] },
        ]
        const columns = getSurveysColumns(schema)
        expect(columns).toHaveLength(4)
        expect(columns[2]).toEqual({ key: "q2-0", header: "Choose: Option A" })
        expect(columns[3]).toEqual({ key: "q2-1", header: "Choose: Option B" })
    })

    it("sliderList item with list expands to one column per entry", () => {
        const schema: SurveySchemaItem[] = [{ id: "q3", type: "sliderList", text: "Rate", list: ["Low", "High"] }]
        const columns = getSurveysColumns(schema)
        expect(columns).toHaveLength(4)
        expect(columns[2]).toEqual({ key: "q3-0", header: "Rate: Low" })
        expect(columns[3]).toEqual({ key: "q3-1", header: "Rate: High" })
    })
})

describe("surveysToCsv", () => {
    const schema: SurveySchemaItem[] = [
        { id: "q1", type: "text", text: "Name" },
        { id: "q2", type: "selectList", text: "Choice", list: ["A", "B"] },
    ]

    it("header row matches column headers from getSurveysColumns", () => {
        const csv = surveysToCsv([], schema)
        const header = csv.split("\n")[0]
        expect(header).toBe("id,created,Name,Choice: A,Choice: B")
    })

    it("answer values mapped by question id into correct column", () => {
        const survey: SurveyRecord = {
            id: "s1",
            created: "2024-01-01",
            updated: "2024-01-01",
            data: [
                { id: "q1", text: "Name", value: "Alice" },
                { id: "q2-0", text: "Choice: A", value: "3" },
                { id: "q2-1", text: "Choice: B", value: "5" },
            ],
        }
        const csv = surveysToCsv([survey], schema)
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("s1,2024-01-01,Alice,3,5")
    })

    it("missing answer for a column becomes empty string", () => {
        const survey: SurveyRecord = {
            id: "s2",
            created: "2024-01-02",
            updated: "2024-01-02",
            data: [],
        }
        const csv = surveysToCsv([survey], schema)
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("s2,2024-01-02,,,")
    })

    it("array answer values joined with semicolon", () => {
        const survey: SurveyRecord = {
            id: "s3",
            created: "2024-01-03",
            updated: "2024-01-03",
            data: [{ id: "q1", text: "Name", value: ["Alice", "Bob"] }],
        }
        const csv = surveysToCsv([survey], schema)
        const dataRow = csv.split("\n")[1]
        expect(dataRow).toBe("s3,2024-01-03,Alice;Bob,,")
    })
})
