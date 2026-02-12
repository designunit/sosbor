"use client"

import { useLocalStorage } from "@mantine/hooks"
import type { Context } from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import { API } from "@/api"

type ClientIdContextType = {
    clientId: string
    clientIdCookie: string
}

export const ClientIdContext: Context<ClientIdContextType> = createContext({
    clientId: "false",
    clientIdCookie: "",
})

function getCookie(name: string): string {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : ""
}

function setCookie(name: string, value: string, expires?: Date) {
    let cookie = `${name}=${encodeURIComponent(value)}; path=/`
    if (expires) {
        cookie += `; expires=${expires.toUTCString()}`
    }
    // biome-ignore lint/suspicious/noDocumentCookie: simple cookie helper for client fingerprinting
    document.cookie = cookie
}

const COOKIE_EXPIRY_DAYS = 300

function cookieExpiry() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * COOKIE_EXPIRY_DAYS)
}

export const ClientIdProvider = ({ children }: { children: React.ReactNode }) => {
    // weak id/auth client, similar to fingerprint client id
    const [cookie, setCookieState] = useState(() => getCookie("clientId"))
    const updateCookie = useCallback((value: string) => {
        setCookie("clientId", value, cookieExpiry())
        setCookieState(value)
    }, [])

    const [clientId, setClientId] = useLocalStorage<string | null>({
        key: "clientId",
        defaultValue: null,
    })
    const { data } = useSWR(!clientId ? API.clients : null, (url) =>
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()),
    )
    useEffect(() => {
        if (!clientId) {
            if (!data) return

            setClientId(data.doc.id)
            updateCookie(data.doc.id)
        }

        if (cookie === "null" || cookie === "false") {
            updateCookie(clientId ?? "")
        }
    }, [clientId, data, cookie, setClientId, updateCookie])

    const { data: isCookiesAllowed } = useSWR(API.check, (url) =>
        fetch(url, {
            method: "post",
            credentials: "include",
        }).then((res) => res.ok),
    )
    useEffect(() => {
        if (isCookiesAllowed === false) {
            updateCookie("")
        }
    }, [isCookiesAllowed, updateCookie])

    return (
        <ClientIdContext.Provider
            value={{
                clientId: clientId ?? "",
                clientIdCookie: cookie ?? "",
            }}
        >
            {children}
        </ClientIdContext.Provider>
    )
}

export const useClientIdContext = () => useContext(ClientIdContext)
