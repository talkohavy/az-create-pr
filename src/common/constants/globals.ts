import os from 'os';
import path from 'path';
import { COLORS } from './colors.js';

export const AZ_CREATE_PR_TOOL_NAME = 'az-create-pr';
export const CONFIG_PATH = path.join(os.homedir(), `.${AZ_CREATE_PR_TOOL_NAME}`, 'config.json');
export const OPEN_HELP_ERROR = 'OPEN_HELP';

export const bigTextAzCreatePrTool = `${COLORS.blue}
    _     _____    ____                   _          ____  ____  
   / \\   |__  /   / ___|_ __ ___  __ _  _| |_ ___   |  _ \\|  _ \\ 
  / _ \\    / /   | |   | '__/ _ \\/ _\` ||_   _/ _ \\  | |_) | |_) |
 / ___ \\  / /_   | |___| | |  __/ (_| |  | ||  __/  |  __/|  _ < 
/_/   \\_\\/____|   \\____|_|  \\___|\\__,_|  |_| \\___|  |_|   |_| \\_\\
${COLORS.stop}`;
