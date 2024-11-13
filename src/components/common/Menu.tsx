import JoyMenu, { MenuActions } from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"
import { ListActionTypes } from "@mui/base/useList"
import {
  FC,
  Fragment,
  cloneElement,
  useCallback,
  useRef,
  useState,
} from "react"

export interface MenuProps {
  control: React.ReactElement
  id: string
  menus: Array<{ label: string } & { [k: string]: any }>
}

const Menu: FC<MenuProps> = (props) => {
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [isOpen, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuActions = useRef<MenuActions>(null)
  const preventReopen = useRef(false)
  const { control, id, menus } = props

  const updateAnchor = useCallback((node: HTMLButtonElement | null) => {
    setButtonElement(node)
  }, [])

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (preventReopen.current) {
      event.preventDefault()
      preventReopen.current = false
      return
    }
    setOpen((open) => !open)
  }

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      setOpen(true)
      if (event.key === "ArrowUp") {
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        })
      }
    }
  }

  const close = () => {
    setOpen(false)
    buttonRef.current!.focus()
  }

  return (
    <Fragment>
      {cloneElement(control, {
        type: "button",
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
        ref: updateAnchor,
        "aria-controls": isOpen ? id : undefined,
        "aria-expanded": isOpen || undefined,
        "aria-haspopup": "menu",
      })}
      <JoyMenu
        id={id}
        placement="bottom-end"
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={buttonElement}
        sx={{
          minWidth: 120,
          background: "rgba(17, 25, 40, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          "& .MuiMenuItem-root": {
            color: "rgba(255, 255, 255, 0.8)",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
            },
            "&.Mui-selected": {
              background: "rgba(79, 172, 254, 0.15)",
              "&:hover": {
                background: "rgba(79, 172, 254, 0.25)",
              },
            },
          },
        }}
      >
        {menus.map(({ label, active, ...item }) => {
          const menuItem = (
            <MenuItem
              selected={active}
              variant={active ? "soft" : "plain"}
              onClick={close}
              {...item}
              sx={{
                fontSize: "0.875rem",
                borderRadius: "md",
                my: 0.5,
                mx: 1,
              }}
            >
              {label}
            </MenuItem>
          )
          if (item.href) {
            return (
              <li key={label} role="none">
                {cloneElement(menuItem, { component: "a" })}
              </li>
            )
          }
          return cloneElement(menuItem, { key: label })
        })}
      </JoyMenu>
    </Fragment>
  )
}

export default Menu
