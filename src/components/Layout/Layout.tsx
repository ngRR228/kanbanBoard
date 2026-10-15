import { Outlet } from "react-router";
import Header from "../Header/Header";
import styles from "./Layout.module.css"

export default function Layout () {

    return(
        <div className={styles.divLayout}>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}