import { Context, createContext, useContext, useEffect } from 'react'
import { useCookie, useLocalStorage } from 'react-use'
import useSWR from 'swr'

type ClientIdContextType = {
    clientId: string
    clientIdCookie: string
}

export const ClientIdContext: Context<ClientIdContextType> = createContext({
    clientId: 'false',
    clientIdCookie: '',
})

export const ClientIdProvider = ({ children }: { children: React.ReactNode }) => {
    // weak id/auth client, similar to fingerprint client id
    const [cookie, updateCookie] = useCookie('clientId')
    const [clientId, setClientId] = useLocalStorage('clientId', null)
    const { data } = useSWR(
        !clientId ? `/api/clients` : null,
        (url) => fetch(
            url,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(res => res.json()),
    )
    useEffect(() => {
        if (!Boolean(clientId)) {
            if (!data) return

            setClientId(data.doc.id)
            updateCookie(data.doc.id, { expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 300) }) // 300 days
        }

        if (cookie == 'null' || cookie == 'false') {
            updateCookie(clientId ?? '', { expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 300) })
        }
    }, [clientId, data, cookie, setClientId, updateCookie])

    const { data: isCookiesAllowed } = useSWR(
        `/api/check`,
        (url) => fetch(
            url,
            {
                method: 'post',
                credentials: 'include',
            }
        ).then(res => res.ok),
    )
    useEffect(() => {
        if (isCookiesAllowed === false) {
            updateCookie('')
        }
    }, [isCookiesAllowed, updateCookie])

    return (
        <ClientIdContext.Provider
            value={{
                clientId: clientId ?? '',
                clientIdCookie: cookie ?? '',
            }}
        >
            {children}
        </ClientIdContext.Provider>
    )
}

export const useClientIdContext = () => useContext(ClientIdContext)
