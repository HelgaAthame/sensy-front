'use client'

import { useSidebar } from '@/shared/sidebar/context/sidebar-context'
import { useCallback, useEffect, useRef, useState } from 'react'
import { VideoIcon } from '@/apps/assets/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/apps/assets/svg-components/Logo'

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

const navItems: NavItem[] = [
  {
    icon: <VideoIcon width={17} height={17} />,
    name: 'Аналитика',
    path: '/analytics',
  },
  {
    icon: <VideoIcon width={17} height={17} />,
    name: 'Звонки',
    subItems: [{ name: 'Загрузка записи', path: '/calls/recordings' }],
  },
  {
    icon: <VideoIcon width={17} height={17} />,
    name: 'Операторы',
    path: '/operators',
  },
  {
    icon: <VideoIcon />,
    name: 'Проекты',
    path: '/projects',
  },
]

export const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const pathname = usePathname()

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main'
    index: number
  } | null>({ type: 'main', index: 0 })

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const isActive = useCallback((path: string) => pathname === path, [pathname])

  useEffect(() => {
    let submenuMatched = false
    ;['main'].forEach(menuType => {
      navItems.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: 'main',
                index,
              })
              submenuMatched = true
            }
          })
        }
      })
    })

    if (!submenuMatched && !openSubmenu) {
      setOpenSubmenu({ type: 'main', index: 1 })
    }
  }, [pathname, isActive, openSubmenu])

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prevHeights => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number, menuType: 'main') => {
    setOpenSubmenu(prevOpenSubmenu => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null
      }
      return { type: menuType, index }
    })
  }

  const renderMenuItems = (items: NavItem[], menuType: 'main') => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? 'bg-gray-100 text-gray-900'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-base">{nav.name}</span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(nav.path)
                    ? 'bg-purple-100 text-purple-800'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="w-[24px] h-[24px] flex items-center justify-center">
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text text-base">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={el => {
                subMenuRefs.current[`${menuType}-${index}`] = el
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-1 space-y-1 ml-10">
                {nav.subItems.map(subItem => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`py-3 px-4 flex items-center text-base rounded-xl ${
                        isActive(subItem.path)
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {subItem.name}
                      {subItem.new && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          new
                        </span>
                      )}
                      {subItem.pro && (
                        <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          pro
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )

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
            <>
              <Logo width={123} height={31} fill={'purle'} />
            </>
          ) : (
            <Logo width={32} height={32} fill={''} />
          )}
        </Link>
      </div>
      <div className="mt-4 mb-8">
        <h2
          className={`mb-6 text-sm uppercase flex leading-[20px] text-gray-400 ${
            !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
          }`}
        >
          {isExpanded || isHovered || isMobileOpen ? 'МЕНЮ' : ''}
        </h2>
        <nav className="mb-6">{renderMenuItems(navItems, 'main')}</nav>
      </div>
    </aside>
  )
}
