using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.DialogBox
{
    /// <summary>
    /// Settings for one item dialogbox.
    /// Item contains several exchanges between people, or exchanges could be one people speaking to himself
    /// </summary>
    public class DialogBoxExchangesItemSetting
    {
        #region Properties
        /// <summary>
        /// Key of the exchange
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Next exchange after this one
        /// </summary>
        public string Next { get; set; }

        /// <summary>
        /// True to active the exchange in dialog box without manual launching
        /// </summary>
        public bool AutoLoad { get; set; }

        /// <summary>
        /// Order index to launch exchange
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Time before the autoload exchange will be displayed
        /// </summary>
        public int TimeBeforeStart { get; set; }

        /// <summary>
        /// List of messages for one exchange
        /// </summary>
        public List<DialogBoxMessageContentSetting> Messages { get; set; }
        #endregion
    }
}
