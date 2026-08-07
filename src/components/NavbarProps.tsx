import { UserProfile } from '../types';

export interface NavbarProps {
    user: UserProfile;
    activeTab: string;
    isTimerActive?: boolean;
    onToggleTimer?: () => void;
}
