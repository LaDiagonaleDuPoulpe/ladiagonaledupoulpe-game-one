using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Signals
{
    /// <summary>
    /// Uses it when there are signals to connect and disconnect
    /// </summary>
    public interface IWithSignals
    {
        /// <summary>
        /// Connects to a signal
        /// </summary>
        /// <param name="signal">Target to activate method</param>
        /// <param name="method">Name of the method to activate</param>
        /// <returns></returns>
        Error Connect(string signal, Godot.Object target, string method, Godot.Collections.Array binds = null, uint flags = 0);

        /// <summary>
        /// Defines if one signal is already connected
        /// </summary>
        /// <returns></returns>
        bool IsConnected(string signal, Godot.Object target, string method);

        /// <summary>
        /// Disconnects one signal from one method
        /// </summary>
        void Disconnect(string signal, Godot.Object target, string method);
    }
}
