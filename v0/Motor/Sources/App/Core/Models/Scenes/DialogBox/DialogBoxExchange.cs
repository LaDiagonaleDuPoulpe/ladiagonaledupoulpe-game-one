using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox
{
    /// <summary>
    /// Exchange contains list of message 
    /// </summary>
    public class DialogBoxExchange
    {
        #region Properties
        /// <summary>
        /// Key of the exchange
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Order index to launch exchange
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Next exchange after this one
        /// </summary>
        public DialogBoxExchange Next { get; set; }

        /// <summary>
        /// True to active the exchange in dialog box without manual launching
        /// </summary>
        public bool AutoLoad { get; set; }

        /// <summary>
        /// Time before the autoload exchange will be displayed
        /// </summary>
        public int TimeBeforeStart { get; set; }

        /// <summary>
        /// List of messages for one exchange
        /// </summary>
        public List<MessageContent> Messages { get; set; }
        #endregion
    }
}
