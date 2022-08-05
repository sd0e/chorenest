import { AccountCircleOutlined, DoneAllOutlined, WarningOutlined } from '@mui/icons-material';

export default function PersonStatusIcon(type) {
    if (type === 'you') {
        return AccountCircleOutlined;
    } else if (type === 'approved') {
        return DoneAllOutlined;
    } else {
		return WarningOutlined;
	}
}