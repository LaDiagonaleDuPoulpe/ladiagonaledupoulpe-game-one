using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Signals
{
    /// <summary>
    /// Represents all events about dialogbox
    /// </summary>
    public class DialogBoxEvents : Node
    {
        #region Fields
        #region Signals
        /// <summary>
		/// Occurs when all messages of one exchange in dialogbox are done
		/// </summary>
		[Signal]
        public delegate void EndOfOneExchange();

        /// <summary>
        /// Uses it to tell the dialog motor to start a dialog
        /// </summary>
        /// <param name="id"></param>
        [Signal]
        public delegate void StartOneDialog(int id);
        #endregion
        #endregion

        #region Public methods
        /// <summary>
        /// Raises the event
        /// </summary>
        public void BeEndOfOneExchange()
        {
            this.EmitSignal(nameof(EndOfOneExchange));
        }

        /// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
        public void AttachEndOfOneExchange(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(EndOfOneExchange), sender, methodName);
        }

        /// <summary>
        /// Raises the event
        /// </summary>
        /// <param name="id">Id of one dialog</param>
        public void BeStartOneDialog(int id)
        {
            this.EmitSignal(nameof(StartOneDialog), id);
        }

        /// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
        public void AttachStartOneDialog(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(StartOneDialog), sender, methodName);
        }
        #endregion
    }
}
