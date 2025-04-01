'use client'

import { useState } from 'react'
import { MoreDotIcon } from '@/apps/assets/icons'
import { Dropdown } from '@/shared/dropdown/dropdown'
import { DropdownItem } from '@/shared/dropdown/dropdown-Item'

export default function TopPages() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }
  ;<div className="relative inline-block">
    <button onClick={toggleDropdown}>
      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
    </button>
    <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
      <DropdownItem
        onItemClick={closeDropdown}
        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        View More
      </DropdownItem>
      <DropdownItem
        onItemClick={closeDropdown}
        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        Delete
      </DropdownItem>
    </Dropdown>
  </div>
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-200 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top Pages</h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="my-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-200">
          <span className="text-gray-400 text-theme-xs"> Source </span>
          <span className="text-right text-gray-400 text-theme-xs"> Pageview </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-200">
          <span className="text-gray-500 text-theme-sm dark:text-gray-400">tailadmin.com</span>
          <span className="text-right text-gray-500 text-theme-sm dark:text-gray-400">4.7K</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-200">
          <span className="text-gray-500 text-theme-sm dark:text-gray-400">
            preview.tailadmin.com
          </span>
          <span className="text-right text-gray-500 text-theme-sm dark:text-gray-400">3.4K</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-200">
          <span className="text-gray-500 text-theme-sm dark:text-gray-400">docs.tailadmin.com</span>
          <span className="text-right text-gray-500 text-theme-sm dark:text-gray-400">2.9K</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-200">
          <span className="text-gray-500 text-theme-sm dark:text-gray-400">
            tailadmin.com/componetns
          </span>
          <span className="text-right text-gray-500 text-theme-sm dark:text-gray-400">1.5K</span>
        </div>
      </div>
    </div>
  )
}
