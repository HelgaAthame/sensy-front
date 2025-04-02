'use client'

import { useSidebar } from '@/shared/sidebar/context/sidebar-context'
import { useCallback, useState } from 'react'
import {
  BarIcon,
  ChevronDownIcon,
  StarFatIcon,
  TelephoneIcon,
  UserCircleIcon,
} from '../../../../public/assets/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../../../../public/assets/svg-components/Logo'
import { appRoutes } from '../../constants/routes'

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

const navItems: NavItem[] = [
  {
    icon: <BarIcon />,
    name: 'Аналитика',
    path: appRoutes.private.dashboard,
  },
  {
    icon: <TelephoneIcon width={24} height={24} />,
    name: 'Звонки',
    subItems: [{ name: 'Загрузка записи', path: appRoutes.private.uploadingRecord }],
  },
  {
    icon: <UserCircleIcon />,
    name: 'Операторы',
    path: appRoutes.private.operators,
  },
  {
    icon: <StarFatIcon />,
    name: 'Проекты',
    path: appRoutes.private.projects,
  },
]

export const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const pathname = usePathname()

  const [openSubmenus, setOpenSubmenus] = useState<number[]>(() =>
    navItems
      .map((item, index) => (item.subItems && item.subItems.length > 0 ? index : -1))
      .filter(index => index !== -1)
  )

  const isActive = useCallback((path: string) => pathname === path, [pathname])

  const hasActiveChild = useCallback(
    (subItems?: { path: string }[]) => {
      return subItems?.some(item => isActive(item.path)) ?? false
    },
    [isActive]
  )

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenus(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <aside
      className={`fixed mt-0 flex flex-col lg:mt-0 top-0 px-6 py-4 left-0 dark:bg-gray-900 bg-white dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <Logo width={123} height={31} fill={'#5A2D76'} />
          ) : (
            <Logo width={32} height={32} fill={'#5A2D76'} />
          )}
        </Link>
      </div>
      <div className="mt-4 mb-8">
        <h2
          className={`mb-6 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
        >
          {isExpanded || isHovered || isMobileOpen ? 'МЕНЮ' : ''}
        </h2>
        <nav className="mb-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <>
                    <button
                      onClick={() => handleSubmenuToggle(index)}
                      className={`menu-item group flex items-center gap-3 px-4 py-3 w-[250px] h-[40px] rounded-full transition-all duration-200 
    ${hasActiveChild(nav.subItems) ? 'text-gray-900' : 'text-gray-700'}
    hover:bg-gray-100`}
                    >
                      <span className="flex items-center justify-center">{nav.icon}</span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <>
                          <span className="menu-item-text text-sm cursor-pointer flex-1 text-left">
                            {nav.name}
                          </span>
                          <ChevronDownIcon
                            width={17.5}
                            height={17.5}
                            className={`transition-transform duration-300 ${
                              openSubmenus.includes(index) ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </>
                      )}
                    </button>
                    {openSubmenus.includes(index) && (
                      <div className="overflow-hidden transition-all duration-300">
                        <ul className="mt-4 space-y-1 ml-10">
                          {nav.subItems.map(subItem => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.path}
                                className={`py-3 px-4 h-[40px] flex items-center text-sm rounded-full ${
                                  isActive(subItem.path)
                                    ? 'bg-purple-100 text-purple-900'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  nav.path && (
                    <Link
                      href={nav.path}
                      className={`menu-item group flex items-center gap-3 px-4 py-3 w-[250px] h-[40px] rounded-full transition-all duration-200 ${
                        isActive(nav.path)
                          ? 'bg-purple-100 text-purple-900 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="w-[24px] h-[24px] flex items-center justify-center">
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text text-sm">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
