import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'
//styles
import './ThemeSelector.css'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
  const { mode, changeColor, changeMode } = useTheme()

  const toggleMode = () => {
    (mode === 'dark') ? changeMode('light') : changeMode('dark')
  }

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={modeIcon}
          alt="dark/light theme switch"
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map( color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  )
}
