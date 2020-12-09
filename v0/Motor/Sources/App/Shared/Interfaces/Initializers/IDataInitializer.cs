using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers
{
    /// <summary>
    /// Contract for all data initializers in the game
    /// </summary>
    public interface IDataInitializer
    {
        #region Public methods
        /// <summary>
        /// Loads all data from database
        /// </summary>
        void Load();

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
        #endregion

        #region Properties
        /// <summary>
        /// Gets unique key of the initializer
        /// </summary>
        string Key { get; }

        /// <summary>
        /// Know if data loaded is finished
        /// </summary>
        bool IsLoaded { get; }
        #endregion
    }
}
