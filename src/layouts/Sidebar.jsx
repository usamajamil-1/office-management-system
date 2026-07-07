import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, User, DollarSign, Settings, Megaphone, UserPlus, ChevronRight, X } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const navItems = (role) => [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    links: [
      { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'hr', 'employee', 'accountant'] },
    ],
  },
  {
    key: 'hr',
    label: 'HR Management',
    icon: User,
    links: [
      { to: '/employees', label: 'Employees', roles: ['admin', 'hr', 'employee'] },
      { to: '/addEmployee', label: 'Add Employees', roles: ['admin', 'hr','employee'] },
      { to: '/attendance', label: 'Attendance', roles: ['admin', 'hr', 'employee'] },
      { to: '/attendanceHistory', label: 'Attendance History', roles: ['admin', 'hr', 'employee'] },
      { to: '/leave', label: 'Leave', roles: ['admin', 'hr', 'employee'] },
      { to: '/applyLeave', label: 'Apply Leave', roles: ['admin', 'hr', 'employee'] },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: DollarSign,
    links: [
      { to: '/payroll', label: 'Payroll', roles: ['admin', 'accountant'] },
      { to: '/addPayroll', label: 'Add Payroll', roles: ['admin', 'accountant'] },
      { to: '/expenses', label: 'Expenses', roles: ['admin', 'accountant'] },
      { to: '/addExpense', label: 'Add Expense', roles: ['admin', 'accountant'] },
      { to: '/reports', label: 'Reports', roles: ['admin', 'accountant'] },
    ],
  },
  {
    key: 'management',
    label: 'Management',
    icon: Settings,
    links: [
      { to: '/tasks', label: 'Tasks', roles: ['admin', 'hr', 'employee'] },
      { to: '/addTask', label: 'Add Task', roles: ['admin', 'hr', 'employee'] },
      { to: '/inventory', label: 'Inventory', roles: ['admin', 'accountant'] },
      { to: '/addItem', label: 'Add Item', roles: ['admin', 'accountant'] },
    ],
  },
  {
    key: 'general',
    label: 'General',
    icon: Megaphone,
    links: [
      { to: '/announcements', label: 'Announcements', roles: ['admin', 'hr', 'employee', 'accountant'] },
      { to: '/addAnnouncements', label: 'Add Announcements', roles: ['admin', 'hr', 'employee', 'accountant'] },
    ],
  },
 {
  key: 'recruitment',
  label: 'Recruitment',
  icon: UserPlus,
  links: [
    { to: '/recruitment', label: 'Recruitment', roles: ['admin', 'hr', 'employee', 'accountant'] },
    { to: '/addApplication', label: 'Add Application', roles: ['admin', 'hr'] },
    { to: '/addVacancy', label: 'Add Vacancy', roles: ['admin', 'hr'] },
    { to: '/addInterview', label: 'Schedule Interview', roles: ['admin', 'hr'] },
  ],
},
]

const AppSidebar = () => {
  const role = localStorage.getItem('role')
  const location = useLocation()
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader>
        <div className="text-white font-bold text-lg py-4 flex items-center justify-between px-2">
          <span>Office Management</span>
          {isMobile && (
            <button onClick={toggleSidebar} className="text-white hover:text-gray-300 cursor-pointer">
              <X size={20} />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems(role).map(({ key, label, icon: Icon, links }) => {
            const visibleLinks = links.filter((l) => l.roles.includes(role))
            if (visibleLinks.length === 0) return null

            return (
              <SidebarMenuItem key={key}>
                <Collapsible className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-white hover:bg-white/10 hover:text-white w-full">
                      <Icon size={18} />
                      <span>{label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" size={16} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {visibleLinks.map((link) => (
                        <SidebarMenuSubItem key={link.to}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname === link.to}
                          >
                            <Link to={link.to} onClick={isMobile ? toggleSidebar : undefined}>
                              {link.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar