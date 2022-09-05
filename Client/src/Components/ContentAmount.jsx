import styles from './Styles/ContentAmount.module.css'

function ContentAmount(props) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const cat = props.suffix
    const suff = capitalizeFirstLetter(cat);
    

    const count = <div className={styles.count}><p>{props.count + " " + suff}</p></div>;
    return count;
}

export default ContentAmount