using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.DialogBox
{
    /// <summary>
    /// Setting to configure dialog box manager
    /// </summary>
    public class DialogBoxSetting
    {
        #region Propeprties
        /// <summary>
        /// List of messages to load in dialog box
        /// </summary>
        public List<DialogBoxExchangesItemSetting> Items { get; set; }
        #endregion
    }
}
