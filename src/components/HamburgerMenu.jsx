import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
function Hamburger() {
  return (
    <>
      <Menu isLazy>
        <MenuButton>
          <HamburgerIcon />
        </MenuButton>
        <MenuList width={"10px"} minW={"200px"}>
          <Link href="/admin/courselist">
            <MenuItem>Course</MenuItem>
          </Link>

          <Link href="/admin/assignment">
            <MenuItem>Assignment</MenuItem>
          </Link>

          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Hamburger;
