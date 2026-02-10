'use client'

import { useModals } from '@mantine/modals'

export function useOpenSurveyModal() {
    const modals = useModals()

    return () => {
        modals.openContextModal(
            'survey',
            {
                centered: true,
                size: 'min(100%, 900px)',
                withCloseButton: false,
                closeOnEscape: false,
                closeOnClickOutside: false,
                innerProps: {
                    defaultValues: {},
                },
            }
        )
    }
}
