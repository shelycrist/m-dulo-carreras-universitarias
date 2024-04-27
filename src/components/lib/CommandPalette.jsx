import React, { useEffect, useRef } from 'react';

import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { HiExclamationCircle, HiPencil, HiSearch } from 'react-icons/hi';
import quickSearch from '@/config/quickSearch';
import { useTranslation } from 'react-i18next';
import { tWithVars } from '@/lib';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const rootRef = useRef(null)
  const { t } = useTranslation()

  const translatedItems = quickSearch.map((item) => {
    return {
      ...item,
      name: tWithVars(`quick-search.items.${item.id}.title`, t),
      description: tWithVars(`quick-search.items.${item.id}.description`, t),
    }
  })

  const filteredItems =
    query === ''
      ? []
      : translatedItems.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      })

  // Esc key closes the dialog and clears the query
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setQuery('')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    // document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <Transition.Root show={isOpen} afterLeave={() => setQuery('')} appear>
      <Dialog className="relative z-40" open={true} onClose={() => {
        setQuery('')
        onClose()
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 overflow-y-auto p-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black ring-opacity-5 transition-all" >
              <Combobox onChange={(item) => {
                router.push(item.url)
                setQuery('')
                onClose()
              }}>
                <div ref={rootRef} className="relative">
                  <HiSearch
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-0 sm:text-sm"
                    placeholder={t("quick-search.placeholder")}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                          classNames('flex cursor-default select-none rounded-xl p-3', active && 'bg-gray-100')
                        }
                      >
                        {({ active }) => (
                          <>
                            <div
                              className={classNames(
                                'flex h-10 w-10 flex-none items-center justify-center rounded-lg',
                                item.color
                              )}
                            >
                              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="ml-4 flex-auto">
                              <p
                                className={classNames(
                                  'text-sm font-medium',
                                  active ? 'text-gray-900' : 'text-gray-700'
                                )}
                              >
                                {item.name}
                              </p>
                              <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                {item.description}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredItems.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <HiExclamationCircle
                      type="outline"
                      name="exclamation-circle"
                      className="mx-auto h-6 w-6 text-gray-400"
                    />
                    <p className="mt-4 font-semibold text-gray-900">{t("quick-search.no-results")}</p>
                    <p className="mt-2 text-gray-500">{t("quick-search.no-results-description")}</p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root>
  )
}
