
import { motion } from 'framer-motion';
import Tasks from './components/Task';
export default () => {
    return (
        <motion.div
         
            key="anchor"
            initial={{ opacity: 0, x: 0, y: 200 }} // Start slightly below
            animate={{ opacity: 1, x: 0, y: 0 }} // Animate to original position
            transition={{
                type: "spring", // Use spring for elastic effect
                stiffness: 300, // Controls speed of the bounce
                damping: 25, // Controls how smooth the bounce is
                duration: 0.6, // Controls the overall duration
            }}
        >
            <Tasks />
        </motion.div>
    );
};