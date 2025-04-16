'use client'

import { useSidebar } from '@/shared/ui/sidebar/context/sidebar-context'
import { useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { appRoutes } from '@/shared/constants/routes'
import {
  BarIcon,
  StarFatIcon,
  TelephoneIcon,
  UserCircleIcon,
  LogoIcon,
} from '../../../../../public/assets/svg-components'
import { DownloadUpIcon } from '@/../public/assets/svg-components/download-up-icon-svg'

type NavItem = {
  name: string
  icon: (isSelected: boolean) => React.ReactNode
  path?: string
}

const navItems: NavItem[] = [
  {
    icon: isSelected => <BarIcon isSelected={isSelected} />,
    name: 'Аналитика',
    path: appRoutes.private.dashboard,
  },
  {
    icon: isSelected => <TelephoneIcon isSelected={isSelected} />,
    name: 'Звонки',
    path: appRoutes.private.calls,
  },
  {
    icon: isSelected => <DownloadUpIcon isSelected={isSelected} />,
    name: 'Загрузка записи',
    path: appRoutes.private.uploadingRecord,
  },
  {
    icon: isSelected => <UserCircleIcon isSelected={isSelected} />,
    name: 'Операторы',
    path: appRoutes.private.operators,
  },
  {
    icon: isSelected => <StarFatIcon isSelected={isSelected} />,
    name: 'Проекты',
    path: appRoutes.private.projects,
  },
]

export const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const pathname = usePathname()

  const isActive = useCallback((path: string) => pathname === path, [pathname])

  return (
    <aside
      className={`fixed mt-0 flex flex-col lg:mt-0 top-0 px-6 py-4 left-0 dark:bg-gray-900 bg-white dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
    >
      <div
        className={`py-4 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
      >
        <Link href="/public">
          {isExpanded || isHovered || isMobileOpen ? (
            <LogoIcon width={123} height={31} fill={'#5A2D76'} />
          ) : (
            <LogoIcon width={32} height={32} fill={'#5A2D76'} />
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
            {navItems.map(nav => {
              const active = nav.path ? isActive(nav.path) : false

              return (
                <li key={nav.name} className="flex flex-col">
                  {nav.path && (
                    <Link
                      href={nav.path}
                      className={`menu-item group flex items-center ${
                        !isExpanded ? 'justify-center' : 'justify-start'
                      } gap-3 ${
                        isExpanded || isMobileOpen ? 'px-4' : 'px-2'
                      } py-3 w-full h-[40px] rounded-full transition-all duration-200 ${
                        active
                          ? 'bg-purple-100 text-purple-900 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center justify-center">{nav.icon(active)}</span>
                      {(isExpanded || isMobileOpen) && (
                        <span className="menu-item-text text-sm">{nav.name}</span>
                      )}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
